import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 92, fill: '#C3EBFA' },
  { name: 'Group B', value: 8, fill: '#FAE27C' },
];

export default function RendimientoProfesorChart() {
  return (
    <div className="bg-white p-4 rounded-md h-[200px] relative flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-center w-[100%]">Performance</h2>
        {/* <img src="/moreDark.png" alt="" width={16} height={16} /> */}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie dataKey="value" startAngle={180} endAngle={0} data={data} cx="50%" cy="90%" innerRadius={70} outerRadius={120} fill="#8884d8" />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-[3.2rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-[18px] font-bold">9.2</p>
        <p className="text-[14px] text-gray-400">of 10 max LTS</p>
      </div>
      <h2 className="font-medium absolute bottom-[1rem] left-0 right-0 m-auto text-center">1st Semester - 2nd Semester</h2>
    </div>
  );
}
