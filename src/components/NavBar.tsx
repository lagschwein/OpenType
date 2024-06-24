import { Input, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

export default function NavBar() {
  return (
    <Navbar isBordered className="absolute">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4 text-secondary-700">
          <h1 className="logo">Open Type </h1>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          type="search"
        />
      </NavbarContent>
    </Navbar>
  )
}