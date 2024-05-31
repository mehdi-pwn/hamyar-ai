import Link from "next/link";
import tools from "../public/assets/tools";
import Typography from "@mui/material/Typography";

const Tools = () => {
  return (
    <div className="py-5 px-5 lg:px-10">
      <div className="py-5 text-center">
        <Typography variant="h3">
          <strong>همه ابزار ها</strong>
        </Typography>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {tools.map((tool) => {
          const items = tool.menus;
          return items.map((item) => (
            <>
              <Card
                icon={item.icon}
                title={item.title}
                description={item.description}
                path={item.path}
              />
            </>
          ));
        })}
      </div>
    </div>
  );
};

const Card = ({ icon, title, description, path }) => {
  return (
    <Link href={path}>
      <div className="flex flex-col h-36 sm:h-40 lg:h-56 gap-2 p-5 rounded-lg bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-200">
        <div className="text-2xl text-gray-700 dark:text-gray-200">{icon}</div>
        <div>
          <Typography variant="h6">
            <strong>{title}</strong>
          </Typography>
        </div>
        <div>
          <Typography variant="body1">{description}</Typography>
        </div>
      </div>
    </Link>
  );
};

export default Tools;
