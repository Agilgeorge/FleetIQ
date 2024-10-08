"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { DriverDetails } from "@/lib/interface";

const Page = () => {
  const [drivers, setdrivers] = useState<DriverDetails[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const fetchdrivers = async () => {
    try {
      const response = await axios.get("/api/driver");
      if (response.data.message === "success") {
        setdrivers(response.data.data);
      } else {
        setError("Failed to fetch drivers");
      }
    } catch (error) {
      setError("An error occurred while fetching drivers");
    } finally {
      setLoading(false);
    }
  };

  const redirectToDetails = (id: string) => () => {
    router.push(`/drivers/${id}`);
  };

  useEffect(() => {
    fetchdrivers();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <Table className="min-w-full bg-white shadow-sm rounded-lg overflow-hidden">
        <TableCaption className="text-gray-600">
          A list of your recent drivers.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-600 border-b border-gray-300">
            <TableHead className="py-3 px-4 text-left">Driver Name</TableHead>
            <TableHead className="py-3 px-4 text-left">Phone</TableHead>
            <TableHead className="py-3 px-4 text-left">Status</TableHead>
            <TableHead className="py-3 px-4 text-left">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers?.map((driver) => (
            <TableRow
              key={driver.id}
              onClick={redirectToDetails(driver.id)}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <TableCell className="py-3 px-4">{driver.name}</TableCell>

              <TableCell className="py-3 px-4 font-medium">
                {driver.phone}
              </TableCell>
              <TableCell className="py-3 px-4 font-medium">
                {driver.status}
              </TableCell>
              <TableCell className="py-3 px-4 font-medium">
                ₹ {driver.balance}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
