import { useMsal } from "@azure/msal-react";

export default function LoginButton() {
  const { instance } = useMsal();

  const login = async () => {
    await instance.loginRedirect({
    scopes: ["User.Read"],
    });
  };

  return (
    <button
      onClick={login}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Login con Microsoft
    </button>
  );
}