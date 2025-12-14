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
    title: "Wellness Hub - Online Yoga & Wellness Classes",
    description: "Book yoga classes, manage your wellness journey, and connect with expert instructors.",
    keywords: ["yoga", "wellness", "health", "fitness", "online classes", "booking"],
    authors: [{ name: "Wellness Hub" }],
    openGraph: {
        title: "Wellness Hub - Online Yoga & Wellness Classes",
        description: "Book yoga classes, manage your wellness journey, and connect with expert instructors.",
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
