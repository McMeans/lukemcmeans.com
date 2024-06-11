import Layout from "./layout.js";

export default function HomePage() {
  return (
    <Layout>
      <title>Luke McMeans - Resume</title>
      <h1>Resume</h1>
      <iframe src="/LukeMcMeans_Resume.pdf" width="100%" height="100%"/>
    </Layout>
  );
}