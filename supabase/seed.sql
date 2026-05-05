-- atlas-demo: seed data.
-- Run AFTER schema.sql. Idempotent — wipes demo_* tables and reinserts.
--
-- Run this in the Supabase SQL Editor.

truncate table
  demo_activity,
  demo_messages,
  demo_milestones,
  demo_order_batches,
  demo_batches,
  demo_line_items,
  demo_orders,
  demo_brands
restart identity cascade;

-- Brands ------------------------------------------------------------
insert into demo_brands (slug, name, primary_color, contact, contact_email) values
  ('summit',   'Summit Athletics', '#14532D', 'Mira Chen',   'mira@summitathletics.com'),
  ('meridian', 'Meridian Apparel', '#1E3A8A', 'Jordan Pike', 'jordan@meridianapparel.com');

-- Orders ------------------------------------------------------------
insert into demo_orders (id, code, brand_slug, ship_by, total_units, status, created_at) values
  ('ord-001', 'PO-2417', 'summit',   '2026-06-10', 2400, 'in_production', '2026-04-12'),
  ('ord-002', 'PO-2418', 'summit',   '2026-05-22', 1200, 'in_production', '2026-04-05'),
  ('ord-003', 'PO-2421', 'meridian', '2026-07-04',  850, 'in_production', '2026-04-26'),
  ('ord-004', 'PO-2425', 'meridian', '2026-08-15', 1800, 'received',      '2026-05-02'),
  ('ord-005', 'PO-2402', 'summit',   '2026-04-01', 3200, 'shipped',       '2026-01-28');

-- Line items --------------------------------------------------------
insert into demo_line_items (id, order_id, sku, description, size, color, units, seq) values
  ('li-001','ord-001','SMT-HOOD-NV-S', 'Heavyweight hoodie','S', 'Navy',         600, 1),
  ('li-002','ord-001','SMT-HOOD-NV-M', 'Heavyweight hoodie','M', 'Navy',         900, 2),
  ('li-003','ord-001','SMT-HOOD-NV-L', 'Heavyweight hoodie','L', 'Navy',         600, 3),
  ('li-004','ord-001','SMT-HOOD-NV-XL','Heavyweight hoodie','XL','Navy',         300, 4),
  ('li-005','ord-002','SMT-TEE-WH-S',  'Performance tee',   'S', 'White',        300, 1),
  ('li-006','ord-002','SMT-TEE-WH-M',  'Performance tee',   'M', 'White',        450, 2),
  ('li-007','ord-002','SMT-TEE-WH-L',  'Performance tee',   'L', 'White',        300, 3),
  ('li-008','ord-002','SMT-TEE-WH-XL', 'Performance tee',   'XL','White',        150, 4),
  ('li-009','ord-003','MRD-COAT-CH-S', 'Charcoal trench',   'S', 'Charcoal',     200, 1),
  ('li-010','ord-003','MRD-COAT-CH-M', 'Charcoal trench',   'M', 'Charcoal',     350, 2),
  ('li-011','ord-003','MRD-COAT-CH-L', 'Charcoal trench',   'L', 'Charcoal',     300, 3),
  ('li-012','ord-004','MRD-SHRT-OX-S', 'Oxford shirt',      'S', 'Oxford Blue',  400, 1),
  ('li-013','ord-004','MRD-SHRT-OX-M', 'Oxford shirt',      'M', 'Oxford Blue',  700, 2),
  ('li-014','ord-004','MRD-SHRT-OX-L', 'Oxford shirt',      'L', 'Oxford Blue',  500, 3),
  ('li-015','ord-004','MRD-SHRT-OX-XL','Oxford shirt',      'XL','Oxford Blue',  200, 4),
  ('li-016','ord-005','SMT-FLEECE-BK-M', 'Fleece pullover','M', 'Black',        1200, 1),
  ('li-017','ord-005','SMT-FLEECE-BK-L', 'Fleece pullover','L', 'Black',        1100, 2),
  ('li-018','ord-005','SMT-FLEECE-BK-XL','Fleece pullover','XL','Black',         900, 3);

-- Batches -----------------------------------------------------------
insert into demo_batches (id, code, factory, units) values
  ('batch-001', 'B-2417-A', 'Plant A · China',    2400),
  ('batch-002', 'B-2418',   'Plant B · Cambodia', 1200),
  ('batch-003', 'B-2421',   'Plant A · China',     850),
  ('batch-004', 'B-2402',   'Plant B · Cambodia', 3200);

insert into demo_order_batches (order_id, batch_id, seq) values
  ('ord-001','batch-001', 1),
  ('ord-002','batch-002', 1),
  ('ord-003','batch-003', 1),
  ('ord-005','batch-004', 1);

-- Milestones --------------------------------------------------------
insert into demo_milestones (id, batch_id, label, state, date, seq) values
  ('m1','batch-001','Materials sourced',   'done',        '2026-04-22', 1),
  ('m2','batch-001','Cut & sew started',   'done',        '2026-04-30', 2),
  ('m3','batch-001','Production midpoint', 'in_progress', '2026-05-08', 3),
  ('m4','batch-001','QC pass',             'todo',         null,        4),
  ('m5','batch-001','Pack & ship',         'todo',         null,        5),

  ('m1','batch-002','Materials sourced',   'done',        '2026-04-15', 1),
  ('m2','batch-002','Cut & sew started',   'done',        '2026-04-21', 2),
  ('m3','batch-002','Production midpoint', 'done',        '2026-04-29', 3),
  ('m4','batch-002','QC pass',             'in_progress', '2026-05-05', 4),
  ('m5','batch-002','Pack & ship',         'todo',         null,        5),

  ('m1','batch-003','Materials sourced',   'done',        '2026-05-01', 1),
  ('m2','batch-003','Cut & sew started',   'in_progress', '2026-05-04', 2),
  ('m3','batch-003','Production midpoint', 'todo',         null,        3),
  ('m4','batch-003','QC pass',             'todo',         null,        4),
  ('m5','batch-003','Pack & ship',         'todo',         null,        5),

  ('m1','batch-004','Materials sourced',   'done', '2026-02-10', 1),
  ('m2','batch-004','Cut & sew started',   'done', '2026-02-18', 2),
  ('m3','batch-004','Production midpoint', 'done', '2026-03-02', 3),
  ('m4','batch-004','QC pass',             'done', '2026-03-15', 4),
  ('m5','batch-004','Pack & ship',         'done', '2026-03-22', 5);

-- Messages ----------------------------------------------------------
insert into demo_messages (id, order_id, at, author_role, author_name, body) values
  ('msg-001','ord-001','2026-04-22T14:10:00Z','system',      'system',      'Materials sourced for batch B-2417-A at Plant A.'),
  ('msg-002','ord-001','2026-04-23T09:02:00Z','manufacturer','Carter Webb', 'Materials in early — moving cut start up by ~24h. Heads up on slight color shift in the navy lot, sample en route.'),
  ('msg-003','ord-001','2026-04-23T16:48:00Z','brand',       'Mira Chen',   'Thanks for the early call. Can we get a sample photo when the first 50 are off the line?'),
  ('msg-004','ord-001','2026-04-24T07:15:00Z','manufacturer','Lin Wei',     'Will do. Photos posted by EOD tomorrow.'),
  ('msg-005','ord-001','2026-05-04T11:15:00Z','brand',       'Mira Chen',   'Approved sample fit. Cleared to keep going.'),
  ('msg-006','ord-001','2026-05-05T09:42:00Z','system',      'system',      'Batch B-2417-A reached production midpoint.'),

  ('msg-010','ord-002','2026-04-21T08:30:00Z','system',      'system',      'Cut & sew started at Plant B.'),
  ('msg-011','ord-002','2026-05-04T08:10:00Z','manufacturer','Lin Wei',     'Inline QC photos uploaded — see attached batch record.'),
  ('msg-012','ord-002','2026-05-05T08:15:00Z','system',      'system',      'Batch B-2418 entered final QC.'),

  ('msg-020','ord-003','2026-05-04T09:20:00Z','system',      'system',      'Batch B-2421 entered cut & sew at Plant A.'),
  ('msg-021','ord-003','2026-05-04T15:00:00Z','brand',       'Jordan Pike', 'Confirming charcoal stays the spec — please don''t substitute. Last season we got a different lot and it threw the color story.'),
  ('msg-022','ord-003','2026-05-04T18:42:00Z','manufacturer','Carter Webb', 'Confirmed — same charcoal mill, same lot family. We''ll send a swatch with the first run.'),

  ('msg-030','ord-004','2026-05-04T16:32:00Z','system',      'system',      'PO-2425 received — 1,800 units oxford shirt, ship by 2026-08-15.'),
  ('msg-031','ord-004','2026-05-03T14:48:00Z','manufacturer','Theo Marsh',  'Allocating Plant B for this one — capacity confirmed for early July start.');

-- Activity ----------------------------------------------------------
insert into demo_activity (id, at, actor, is_system, body, brand_slug, order_id) values
  ('a-001','2026-05-05T09:42:00Z','system',     true,  'Batch B-2417-A reached production midpoint at Plant A.', 'summit',   'ord-001'),
  ('a-002','2026-05-05T08:10:00Z','Lin Wei',    false, 'Uploaded inline QC photos for batch B-2418.',            'summit',   'ord-002'),
  ('a-003','2026-05-04T16:32:00Z','system',     true,  'PO-2425 received from Meridian Apparel — 1,800 units.',  'meridian', 'ord-004'),
  ('a-004','2026-05-04T11:15:00Z','Mira Chen',  false, 'Approved sample fit on PO-2417 hoodies.',                 'summit',   'ord-001'),
  ('a-005','2026-05-04T09:20:00Z','system',     true,  'Batch B-2421 entered cut & sew at Plant A.',              'meridian', 'ord-003'),
  ('a-006','2026-05-03T14:48:00Z','Theo Marsh', false, 'Confirmed factory allocation for PO-2425 — assigning Plant B.', 'meridian', 'ord-004'),
  ('a-007','2026-03-22T18:00:00Z','system',     true,  'Batch B-2402 shipped from Plant B — 3,200 units.',         'summit',   'ord-005');
