export const ListItem = ({ text }) => {
  return (
    <li className="flex items-center">
      <span className="w-2 h-2 mr-3 bg-gray-400 rounded-full"></span>
      <span className="text-sm">{text}</span>
    </li>
  );
};
