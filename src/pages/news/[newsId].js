import RootLayout from "@/components/Layouts/RootLayout";
import { Col, Row } from "antd";
import React from "react";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const NewsDetails = ({ data }) => {
  console.log(data);
  return (
    <div>
      {" "}
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <div>
            <Image
              src={data?.image_url}
              width={500}
              height={300}
              responsive
              alt="data image"
            />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div>
            <div
              className="line"
              style={{
                height: "5px",
                margin: "20px 0",
                background: "#000",
                width: "100%",
              }}
            ></div>

            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                color: "gray",
                margin: "10px 0px",
                fontSize: "12px",
              }}
            >
              <span>
                <CalendarOutlined /> {data?.release_date}
              </span>
              <span>
                <CommentOutlined /> {data?.comment_count} COMMENTS
              </span>
              <span>
                <ProfileOutlined /> {data?.category}
              </span>
            </p>

            <p style={{ fontSize: "15px" }}>{data?.description.length}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NewsDetails;
NewsDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// export const getStaticPaths = async () => {
//   const res = await fetch(`http://localhost:5000/news`);
//   const newses = await res.json();
//   const paths = newses.map((news) => ({
//     params: { newsId: news.id.toString() },
//   }));
//   return { paths, fallback: false };
// };

export const getServerSideProps = async (context) => {
  const { params } = context;
  const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};
