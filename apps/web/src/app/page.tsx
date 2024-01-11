import withAuthRequired from "~/guards/auth/withAuthRequired";

function Home() {
  return <h1>halostemba</h1>;
}

export default withAuthRequired(Home);
