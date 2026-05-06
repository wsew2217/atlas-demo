export function WorkflowDiagram() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--cream)] p-6 md:p-10">
      <svg
        viewBox="0 0 900 480"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full"
        role="img"
        aria-label="Atlas workflow: PDF PO arrives, Atlas parses and allocates, factories produce, customer portal updates live"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1A1A1A" />
          </marker>
          <marker
            id="arrow-accent"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#B8763D" />
          </marker>
        </defs>

        {/* PDF PO node (left) */}
        <g>
          <rect x="20" y="200" width="140" height="80" rx="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
          <text x="35" y="225" fontFamily="ui-monospace, monospace" fontSize="10" fill="#5C5C5C" letterSpacing="2">
            STEP 1 · INTAKE
          </text>
          <text x="35" y="250" fontFamily="serif" fontSize="20" fontWeight="600" fill="#1A1A1A">
            PDF / Email
          </text>
          <text x="35" y="270" fontFamily="ui-monospace, monospace" fontSize="9" fill="#5C5C5C">
            PO arrives
          </text>
        </g>

        {/* Atlas Engine (center) */}
        <g>
          <rect x="270" y="160" width="200" height="160" rx="8" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="1.5" />
          <text x="290" y="185" fontFamily="ui-monospace, monospace" fontSize="10" fill="#FAF7F2" opacity="0.6" letterSpacing="2">
            STEP 2 · STRUCTURE
          </text>
          <text x="290" y="215" fontFamily="serif" fontSize="28" fontWeight="600" fill="#FAF7F2">
            Atlas
          </text>
          <text x="290" y="232" fontFamily="serif" fontSize="14" fontStyle="italic" fill="#B8763D">
            engine
          </text>
          <line x1="290" y1="248" x2="450" y2="248" stroke="#FAF7F2" strokeOpacity="0.2" strokeWidth="1" />
          <text x="290" y="268" fontFamily="ui-monospace, monospace" fontSize="9" fill="#FAF7F2" opacity="0.7">
            · parses POs
          </text>
          <text x="290" y="282" fontFamily="ui-monospace, monospace" fontSize="9" fill="#FAF7F2" opacity="0.7">
            · allocates batches
          </text>
          <text x="290" y="296" fontFamily="ui-monospace, monospace" fontSize="9" fill="#FAF7F2" opacity="0.7">
            · routes to factories
          </text>
          <text x="290" y="310" fontFamily="ui-monospace, monospace" fontSize="9" fill="#FAF7F2" opacity="0.7">
            · syncs to portal
          </text>
        </g>

        {/* Plant A (upper right of center) */}
        <g>
          <rect x="570" y="100" width="160" height="80" rx="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
          <text x="585" y="125" fontFamily="ui-monospace, monospace" fontSize="10" fill="#5C5C5C" letterSpacing="2">
            FACTORY · CHINA
          </text>
          <text x="585" y="148" fontFamily="serif" fontSize="18" fontWeight="600" fill="#1A1A1A">
            Plant A
          </text>
          <text x="585" y="167" fontFamily="ui-monospace, monospace" fontSize="9" fill="#5C5C5C">
            cut · sew · QC
          </text>
        </g>

        {/* Plant B (lower right of center) */}
        <g>
          <rect x="570" y="300" width="160" height="80" rx="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
          <text x="585" y="325" fontFamily="ui-monospace, monospace" fontSize="10" fill="#5C5C5C" letterSpacing="2">
            FACTORY · CAMBODIA
          </text>
          <text x="585" y="348" fontFamily="serif" fontSize="18" fontWeight="600" fill="#1A1A1A">
            Plant B
          </text>
          <text x="585" y="367" fontFamily="ui-monospace, monospace" fontSize="9" fill="#5C5C5C">
            cut · sew · QC
          </text>
        </g>

        {/* Customer Portal (right) */}
        <g>
          <rect x="780" y="180" width="100" height="120" rx="6" fill="#FAF7F2" stroke="#B8763D" strokeWidth="2" />
          <line x1="790" y1="200" x2="870" y2="200" stroke="#B8763D" strokeOpacity="0.4" strokeWidth="1" />
          <text x="785" y="217" fontFamily="ui-monospace, monospace" fontSize="9" fill="#B8763D" letterSpacing="1.5">
            PORTAL
          </text>
          <text x="785" y="240" fontFamily="serif" fontSize="14" fontWeight="600" fill="#1A1A1A">
            Brand
          </text>
          <text x="785" y="258" fontFamily="ui-monospace, monospace" fontSize="8" fill="#5C5C5C">
            their domain
          </text>
          <text x="785" y="278" fontFamily="ui-monospace, monospace" fontSize="8" fill="#5C5C5C">
            their colors
          </text>
          <text x="785" y="293" fontFamily="ui-monospace, monospace" fontSize="8" fill="#5C5C5C">
            live status
          </text>
        </g>

        {/* Arrow: PDF → Atlas */}
        <line x1="160" y1="240" x2="265" y2="240" stroke="#1A1A1A" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="180" y="232" fontFamily="ui-monospace, monospace" fontSize="9" fill="#5C5C5C">parse</text>

        {/* Arrow: Atlas → Plant A (upper) */}
        <path d="M 470 200 Q 520 200 565 145" stroke="#1A1A1A" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        <text x="475" y="155" fontFamily="ui-monospace, monospace" fontSize="9" fill="#5C5C5C">allocate</text>

        {/* Arrow: Atlas → Plant B (lower) */}
        <path d="M 470 280 Q 520 280 565 335" stroke="#1A1A1A" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        <text x="475" y="328" fontFamily="ui-monospace, monospace" fontSize="9" fill="#5C5C5C">allocate</text>

        {/* Arrow: Plant A → Atlas (status updates back) */}
        <path d="M 565 165 Q 520 165 470 215" stroke="#B8763D" strokeWidth="1.5" fill="none" strokeDasharray="4 4" markerEnd="url(#arrow-accent)" />

        {/* Arrow: Plant B → Atlas (status updates back) */}
        <path d="M 565 320 Q 520 320 470 270" stroke="#B8763D" strokeWidth="1.5" fill="none" strokeDasharray="4 4" markerEnd="url(#arrow-accent)" />

        {/* Arrow: Atlas → Portal */}
        <path d="M 470 240 L 775 240" stroke="#B8763D" strokeWidth="2" markerEnd="url(#arrow-accent)" />
        <text x="610" y="232" fontFamily="ui-monospace, monospace" fontSize="9" fill="#B8763D">live updates</text>

        {/* Bottom legend */}
        <g transform="translate(20, 430)">
          <line x1="0" y1="6" x2="20" y2="6" stroke="#1A1A1A" strokeWidth="2" />
          <text x="28" y="10" fontFamily="ui-monospace, monospace" fontSize="9" fill="#5C5C5C">Operational data</text>

          <line x1="180" y1="6" x2="200" y2="6" stroke="#B8763D" strokeWidth="2" strokeDasharray="4 4" />
          <text x="208" y="10" fontFamily="ui-monospace, monospace" fontSize="9" fill="#5C5C5C">Status updates (auto-propagated)</text>
        </g>
      </svg>
    </div>
  )
}
