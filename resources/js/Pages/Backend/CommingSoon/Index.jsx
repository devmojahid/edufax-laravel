import { Layout } from "@/Layouts/Partials/Layout";
import React from "react";
import ContentLayout from "../ContentLayout";
import CommingSoon from "@/Components/Others/CommingSoon";

const Index = () => {
  return (
    <ContentLayout>
      <Layout.Body>
        <CommingSoon />
      </Layout.Body>
    </ContentLayout>
  );
};

export default Index;
