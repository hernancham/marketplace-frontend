import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { session } = useAuth();
  return (
    <div>
      {session
        ? `Bienvenido, ${session.user.name}!`
        : "Bienvenido a la página de perfil"}
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
