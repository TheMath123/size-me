'use client'

import { Resizable } from "re-resizable";
import { SizeMe } from "./components/sizeme";

export default function Home() {
  return (
    <div>
      <SizeMe>
        {({ width, height }) => (
          <Resizable
            defaultSize={{ width: 200, height: 200 }}
          >
            <div className="flex flex-1 h-full bg-blue-700 text-white p-4 border border-blue-800 rounded-lg">
              Largura: {width}px, Altura: {height}px
            </div>
          </Resizable>
        )}
      </SizeMe>
    </div>
  );
}
