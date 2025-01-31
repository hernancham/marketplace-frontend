import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      {user ? `Bienvenido, ${user.name}!` : "Bienvenido a la página de perfil"}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
