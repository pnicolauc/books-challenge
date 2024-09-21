import { Button } from "./Button";
import { ArrowDown } from "../icons/ArrowDown";

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

export const Dropdown = ({ title, children }: DropdownProps) => {
  return (
    <div className="group" >
      <Button className="peer">
        {title}
        <ArrowDown />
      </Button>
      <div
        id="menu"
        role="menu"
        data-popover="menu"
        data-popover-placement="bottom"
        className="z-10 absolute invisible peer-focus:visible hover:visible divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700"
      >
          {children}
      </div>
    </div>
  );
};
