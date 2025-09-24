"use client";

export default function DesignTest() {
  return (
    <div className="min-h-screen bg-bg-base p-8">
      <div className="container-default space-y-8">
        {/* Headers */}
        <section>
          <h1 className="text-5xl text-fg heading mb-4">Design System Test</h1>
          <p className="text-fg-muted">Industrial Noir + Safety Orange + Glassmorphism</p>
        </section>

        {/* Glass Panels */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="glass p-6 rounded-xl">
            <h2 className="text-2xl text-fg heading mb-2">Glass Panel</h2>
            <p className="text-fg-muted">This is a glassmorphic panel with blur effect.</p>
            <button className="mt-4 bg-brand hover:bg-brand-700 text-white px-6 py-2 rounded-lg transition-colors">
              CTA Button
            </button>
          </div>

          <div className="glass-soft p-6 rounded-xl">
            <h2 className="text-2xl text-fg heading mb-2">Soft Glass</h2>
            <p className="text-fg-muted">Softer glass effect with less opacity.</p>
            <div className="mt-4 flex gap-2">
              <span className="chip">Tag 1</span>
              <span className="chip">Tag 2</span>
              <span className="chip">Tag 3</span>
            </div>
          </div>
        </section>

        {/* Regular Panel */}
        <section>
          <div className="panel p-6">
            <h2 className="text-3xl text-fg heading mb-4">Regular Panel</h2>
            <p className="text-fg mb-4">
              This is a regular elevated panel with the brand colors.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-fg-muted">Background:</span>
                <span className="text-fg ml-2">#1A1C1E</span>
              </div>
              <div>
                <span className="text-fg-muted">Brand:</span>
                <span className="text-brand ml-2">#D64218</span>
              </div>
              <div>
                <span className="text-fg-muted">Text:</span>
                <span className="text-fg ml-2">#ECEFF1</span>
              </div>
              <div>
                <span className="text-fg-muted">Muted:</span>
                <span className="text-fg-muted ml-2">#A5ABAF</span>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-3xl text-fg heading">Typography</h2>
          <div className="space-y-2">
            <h1 className="text-6xl font-display text-fg heading">Display Heading</h1>
            <h2 className="text-4xl font-sans text-fg heading">Section Title</h2>
            <h3 className="text-2xl font-sans text-fg">Subsection</h3>
            <p className="text-fg">Regular paragraph text with Inter font.</p>
            <p className="text-fg-muted">Muted text for secondary information.</p>
          </div>
        </section>

        {/* Color Swatches */}
        <section>
          <h2 className="text-3xl text-fg heading mb-4">Color Palette</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-full h-24 bg-bg-base border border-line rounded-lg mb-2"></div>
              <p className="text-xs text-fg-muted">Base BG</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-bg-e1 border border-line rounded-lg mb-2"></div>
              <p className="text-xs text-fg-muted">Elevation 1</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-panel border border-line rounded-lg mb-2"></div>
              <p className="text-xs text-fg-muted">Panel</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-brand rounded-lg mb-2"></div>
              <p className="text-xs text-fg-muted">Brand Orange</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}