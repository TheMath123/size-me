'use client'

import { Resizable } from "re-resizable";
import { SizeMe } from "./components/sizeme";

export default function Home() {
  return (
    <div className="flex flex-row gap-4 p-4">
      <SizeMe>
        {({ width, height }) => (
          <Resizable
            defaultSize={{ width: 200, height: 200 }}
            minHeight={100}
            minWidth={100}
            maxHeight={1000}
            maxWidth={1000}
          >
            <div className="flex flex-1 h-full bg-blue-700 text-white p-4 border border-blue-800 rounded-lg">
              Largura: {width}px, Altura: {height}px
            </div>
          </Resizable>
        )}
      </SizeMe>
      <SizeMe>
        {({ width, height }) => (
          <Resizable
            defaultSize={{ width: 300, height: 500 }}
            minHeight={100}
            minWidth={100}
            maxHeight={1000}
            maxWidth={1000}
          >
            <div className="flex flex-1 h-full bg-green-700 text-white p-4 border border-green-800 rounded-lg">
              Largura: {width}px, Altura: {height}px
            </div>
          </Resizable>
        )}
      </SizeMe>
      <SizeMe>
        {({ width, height }) => (
          <Resizable
            defaultSize={{ width: 100, height: 600 }}
            minHeight={100}
            minWidth={100}
            maxHeight={1000}
            maxWidth={1000}
          >
            <div className="flex flex-1 h-full bg-red-700 text-white p-4 border border-red-800 rounded-lg">
              Largura: {width}px, Altura: {height}px
            </div>
          </Resizable>
        )}
      </SizeMe>
    </div>
  );
}
