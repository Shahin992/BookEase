import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Map from "./Map";

const MapSection = () => {
  const [mapboxToken, setMapboxToken] = useState("");
  const [showMap, setShowMap] = useState(false);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Explore Our Locations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find amazing properties and venues across the globe
          </p>
        </div>

        {!showMap ? (
          <div className="max-w-md mx-auto space-y-4">
            <div className="flex items-center gap-2 p-4 bg-secondary/30 rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                Enter your Mapbox public token to view the interactive map
              </p>
            </div>
            <Input
              type="text"
              placeholder="Enter Mapbox public token (pk.xxx)"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="w-full"
            />
            <Button
              onClick={() => setShowMap(true)}
              disabled={!mapboxToken.startsWith("pk.")}
              className="w-full"
            >
              Show Interactive Map
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Get your free token at{" "}
              <a
                href="https://www.mapbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <Map token={mapboxToken} />
          </div>
        )}
      </div>
    </section>
  );
};

export default MapSection;
