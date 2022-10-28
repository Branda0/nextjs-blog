import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

import { getSortedPostsData } from "../lib/posts";

import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
}

export default function Home({ allPostsData }) {
  const [data, setData] = useState<number>();

  function multiply(params: number, multiplier: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(params * multiplier);
      }, 3000);
    });
  }

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      try {
        const response = (await multiply(3, 4)) as number;
        console.log({ response: response });
        if (isSubscribed) setData(response);
      } catch (error) {
        console.log(error);
      }
      console.log("resolution ou rejet");
    };

    fetchData();
    console.log("fetching");

    return () => {
      isSubscribed = false;
      console.log("clean up");
    };
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
