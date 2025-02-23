import TriangleBar from "@/components/Dashboard/TriancleBar";
import Spinner from "@/components/shared/Spinner";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GiWallet } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi2";
import { MdRestaurantMenu } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading: statsIsLoading } = useQuery({
    queryKey: ["admin-stats", { email: user?.email }],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/admin-stats");
      return res.data.data;
    },
  });

  if (statsIsLoading) return <Spinner />;

  const { revanue, menuCount, ordersCount, userCount, orderStats } = stats;
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <title>Bistro Boss | Admin</title>
      <section className="py-12 px-6">
        <div>
          <h2 className="text-3xl font-cinzel font-bold text-neutral mb-6">
            Hi, Welcome Back, {user.displayName && user.displayName}!
          </h2>

          <div className="grid grid-cols-4 gap-6 text-white">
            <div className="py-9 px-14 flex items-center justify-center gap-6 bg-gradient-to-r from-revenu-1 to-revenu-2 rounded-lg">
              <GiWallet className="text-6xl" />
              <div className="font-inter font-bold space-y-1">
                <p className="text-[40px]">${revanue?.toFixed(2)}</p>
                <p className="text-2xl">Revenue</p>
              </div>
            </div>

            <div className="py-9 px-14 flex items-center justify-center gap-6 bg-gradient-to-r from-customers-1 to-customers-2 rounded-lg">
              <HiUserGroup className="text-6xl" />
              <div className="font-inter font-bold space-y-1">
                <p className="text-[40px]">{userCount}</p>
                <p className="text-2xl">Customers</p>
              </div>
            </div>

            <div className="py-9 px-14 flex items-center justify-center gap-6 bg-gradient-to-r from-products-1 to-products-2 rounded-lg">
              <MdRestaurantMenu className="text-6xl" />
              <div className="font-inter font-bold space-y-1">
                <p className="text-[40px]">{menuCount}</p>
                <p className="text-2xl">Products</p>
              </div>
            </div>

            <div className="py-9 px-14 flex items-center justify-center gap-6 bg-gradient-to-r from-orders-1 to-orders-2 rounded-lg">
              <TbTruckDelivery className="text-6xl" />
              <div className="font-inter font-bold space-y-1">
                <p className="text-[40px]">{ordersCount}</p>
                <p className="text-2xl">Orders</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <BarChart
                width={500}
                height={300}
                data={orderStats}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis dataKey="revanue" />
                <Bar
                  dataKey="revanue"
                  fill="#8884d8"
                  shape={<TriangleBar />}
                  label={{ position: "top" }}
                >
                  {orderStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                  ))}
                </Bar>
              </BarChart>
            </div>
            <div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={500} height={500}>
                  <Pie
                    data={orderStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {orderStats.map((entry, index) => (
                      <Cell
                        name={entry.category}
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminHome;
