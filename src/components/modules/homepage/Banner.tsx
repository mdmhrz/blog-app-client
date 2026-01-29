import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Banner = () => {
    return (
        <section className="w-full">
            <div className="relative w-full h-[280px] md:h-[380px] lg:h-[440px]">
                {/* Background Image */}
                <Image
                    src="/banner.avif"
                    // src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    // alt="Blog banner"
                    fill
                    priority
                    className="object-cover rounded-xl"
                    alt="Banner image"
                />

                {/* Gradient + vignette */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/90" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-3xl text-center  rounded-2xl p-6 md:p-10">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs md:text-sm mb-4">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            Insights • Tutorials • Updates
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                            Welcome to Our Blog
                        </h1>

                        <p className="mt-4 text-gray-300 text-sm md:text-lg">
                            Practical guides, deep-dive articles, and modern web development
                            insights crafted for curious developers.
                        </p>

                        {/* Actions */}
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="gap-2">
                                Explore Posts
                                <ArrowRight className="w-4 h-4" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/30 text-white hover:bg-white/10"
                            >
                                Latest Articles
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
