"use client";

import Head from "next/head";
import { useState } from "react";
import tailwindColors from "tailwindcss/colors";

// Define the color palette type
type TailwindColors = {
  [key: string]: string[]; // Make shades an array of strings for valid keys
};

const colors: TailwindColors = {
  gray: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  red: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  blue: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  green: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  zinc: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  yellow: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  purple: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  indigo: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  teal: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  pink: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
};

export default function Colors() {
  const [copied, setCopied] = useState<string | null>(null);

  // Copy the color and hex value to the clipboard
  const copyToClipboard = (color: string, hex: string) => {
    navigator.clipboard.writeText(`${hex}`);
    setCopied(color);
    setTimeout(() => setCopied(null), 2000);
  };

  // Get the HEX value of a color
  const getColorHex = (color: keyof typeof tailwindColors, shade: string): string => {
    const colorObject = tailwindColors[color];
    return colorObject[shade as keyof typeof colorObject] || "#000"; // Safe lookup with string keys
  };

  // Calculate luminance to determine text color
  const getTextColor = (hex: string): string => {
    const rgb = hex
      .replace("#", "")
      .match(/.{2}/g)!
      .map((x) => parseInt(x, 16));

    // Calculate luminance
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

    // Return appropriate text color
    return luminance > 128 ? "text-black" : "text-white";
  };

  return (
    <>
      <Head>
        <title>Tailwind CSS Color Palette</title>
        <meta
          name="description"
          content="Explore Tailwind CSS colors and copy them easily."
        />
      </Head>
      <div className="min-h-screen bg-zinc-950 text-white p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Tailwind CSS Colors
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(colors).map(([color, shades]) =>
            shades.map((shade) => {
              const tailwindColor = `${color}-${shade}`;
              const hex = getColorHex(color as keyof typeof tailwindColors, shade);
              const textColor = getTextColor(hex);
              return (
                <div
                  key={tailwindColor}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md cursor-pointer ${textColor}`}
                  style={{ backgroundColor: hex }}
                  onClick={() => copyToClipboard(tailwindColor, hex)}
                >
                  <p className="text-sm font-medium">{tailwindColor}</p>
                  <p className="text-xs">{hex}</p>
                  {copied === tailwindColor && (
                    <p className="text-xs mt-1 text-green-400">Copied!</p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
