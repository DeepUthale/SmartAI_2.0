import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage
      src="/logo.png" className="p-0.5"/>
    </Avatar>
  );
};