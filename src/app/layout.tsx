import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
    display: 'swap',
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: '--font-outfit',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Siobhan Sears Yoga - Halifax, NS",
    description: "Yoga Teacher | Thai Massage Practitioner | Early Childhood Educator.  Join me for mindful movement and authentic wellness in Halifax, Nova Scotia. 🌞",
    keywords: ["siobhan sears", "yoga halifax", "thai massage", "kids yoga", "yoga teacher halifax", "wellness nova scotia", "halifax yoga", "sun salutation"],
    authors: [{ name: "Siobhan Sears" }],
    openGraph: {
        title: "Siobhan Sears Yoga - Halifax, NS",
        description: "Yoga Teacher | Thai Massage Practitioner. Join me for mindful movement and authentic wellness in beautiful Halifax, Nova Scotia.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className="font-body antialiased">
                <Navbar />
                <div className="pt-16 md:pt-20">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
