import { useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { Button, ErrorText, Field, Input } from "@/components/ui";
import { theme as t } from "@/styles/theme";
import { useAuth } from "./AuthContext";

const Card = styled.form`
  width: min(380px, 92vw);
  margin: 14vh auto 0;
  background: #fff;
  border: 2px solid ${t.ink};
  border-radius: 14px;
  padding: 32px;
  display: grid;
  gap: 16px;
  h1 {
    margin: 0;
    font-size: 26px;
  }
`;

export default function LoginPage() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await login(email, pass);
    } catch {
      setErr("Wrong email or password.");
    }
    setBusy(false);
  };
  return (
    <Card onSubmit={submit}>
      <h1>Blind Spot admin</h1>
      <Field>
        Login
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Field>
      <Field>
        Password
        <Input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
      </Field>
      {err && <ErrorText role="alert">{err}</ErrorText>}
      <Button $primary disabled={busy}>
        {busy ? "Checking…" : "Launch"}
      </Button>
    </Card>
  );
}
