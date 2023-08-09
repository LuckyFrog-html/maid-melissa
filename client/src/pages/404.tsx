import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function Custom404({}: InferGetStaticPropsType<
    typeof getStaticProps
>) {
    return <div></div>;
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { locale } = context;

    return {
        redirect: {
            destination: `/${locale}`,
            permanent: true,
        },
    };
};
