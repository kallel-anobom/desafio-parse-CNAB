import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default LoginPage;
