import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "@mui/material";

export default function LoginBtn() {
  const router = useRouter();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setProviders();
  },[])

  return (
    <>
      {/* {providers && Object.values(providers).map((provider) => {
        <button type="button" key={provider.name} ></button>
      })} */}
      <button type="button" className="bg-[#2F2F2F] px-2 border-1 rounded-2xl text-sm font-light  text-white "
        onClick={() => {
          signIn
          router.push('/login');
        }}>
        <ChevronRightRoundedIcon
          style={{ color: "#101010" }}
          className=" bg-white rounded-full mr-1"
        />
        Login
      </button>
    </>
  );
}
