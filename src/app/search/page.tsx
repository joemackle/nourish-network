"use client";

import { MapComponent } from "@/components/map";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Page() {
  const [zip, setZip] = useState("");

  return (
    <div className="w-screen">
      <h1 className="justify-self-center">Search for pantries and events</h1>
      <div className="grid w-64 gap-2 justify-self-center">
        <Label htmlFor="zip">Zip Code</Label>
        <Input
          id="zip"
          placeholder="32601"
          type="number"
          pattern="[0-9]*"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </div>
      <div className="w-3/4 justify-self-center">
        <MapComponent zip={zip} />
      </div>
    </div>
  );
}
