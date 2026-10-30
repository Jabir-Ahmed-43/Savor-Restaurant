// app/actions/analyticsActions.js
import clientPromise from "@/lib/mongodb";

export async function getDashboardStats(timeRange = "all") {
  const client = await clientPromise;
  const db = client.db("savor-rest");

  let dateFilter = {};
  const now = new Date();

  // Construct the time filter using MongoDB $gte operator
  if (timeRange === "today") {
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    dateFilter = { createdAt: { $gte: startOfDay } };
  } else if (timeRange === "week") {
    const startOfWeek = new Date(now.setDate(now.getDate() - 7));
    dateFilter = { createdAt: { $gte: startOfWeek } };
  } else if (timeRange === "month") {
    const startOfMonth = new Date(now.setMonth(now.getMonth() - 1));
    dateFilter = { createdAt: { $gte: startOfMonth } };
  }

  try {
    // 1. Calculate Revenue (Only from completed/delivered orders)
    const revenuePipeline = [
      { $match: { ...dateFilter, status: "Completed" } },
      { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
    ];
    const revenueResult = await db
      .collection("orders")
      .aggregate(revenuePipeline)
      .toArray();
    const grossRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    // 2. Count Total Orders (All statuses)
    const totalOrders = await db
      .collection("orders")
      .countDocuments(dateFilter);

    // 3. Count Active Kitchen Tickets (Orders currently being prepped)
    const activeTickets = await db.collection("orders").countDocuments({
      status: { $in: ["New Arrival", "In Kitchen"] },
    });

    return {
      grossRevenue,
      totalOrders,
      activeTickets,
    };
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return { grossRevenue: 0, totalOrders: 0, activeTickets: 0 };
  }
}
