import { Menu, Button, useMantineColorScheme } from "@mantine/core";

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>theme</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Color Scheme</Menu.Label>
        <Menu.Item>
          <Button onClick={() => setColorScheme("light")}>Light</Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => setColorScheme("dark")}>Dark</Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => setColorScheme("auto")}>System theme</Button>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
