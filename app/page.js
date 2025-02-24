"use client";

import { set } from "mongoose";
import { useState } from "react";
// Import Copy And Check Icons
import { FiCopy, FiCheck } from "react-icons/fi";

export default function Home() {
  const [url, setUrl] = useState("");
  const [customText, setCustomText] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, customText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong!");
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">URL Shortner</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block mb-2">
            Enter URl to shorten
          </label>
          <input
            className="w-full p-2 border rounded border-green-500"
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="https:example.com"
          />
        </div>
        <div>
          <label htmlFor="customText" className="block mb-2">
            Custom Text (Optional)
          </label>
          <input
            className="w-full p-2 border rounded border-green-500"
            type="text"
            id="customText"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Custom Text"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Shorten URl
        </button>
      </form>
      {/* On Any Error Show Error Box */}
      {error && (
        <div className="mt-4 p-4 bg-green-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {/* If short url successfull show the shorten link below  */}
      {shortUrl && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="mb-2">Shortened URL:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="w-full p-2 border rounded bg-white"
            />
            {/* Coopy To Clipboard Button */}
            <button
              onClick={copyToClipboard}
              className="p-2.5 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200"
              title={copied ? "Copied" : "Copy to Clipboard"}
            >
              {copied ? (
                <FiCheck className="w-5 h-5 text-green-600" />
              ) : (
                <FiCopy className="w-5 h-5 text-green-600" />
              )}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
