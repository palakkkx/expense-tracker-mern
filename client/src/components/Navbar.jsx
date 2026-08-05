import { Bell, Search, CalendarDays } from "lucide-react";

function Navbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back 👋
        </p>

        <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
          <CalendarDays size={16} />
          {today}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={22} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            P
          </div>

          <div className="hidden md:block">
            <h3 className="font-semibold">Palak</h3>
            <p className="text-sm text-gray-500">
              Expense Manager
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;