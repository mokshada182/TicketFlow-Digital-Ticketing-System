import { SignIn } from "@clerk/nextjs";
import "../../main.css";

export default function In() {
  return <div className="sign-in"><SignIn /></div>;
}
