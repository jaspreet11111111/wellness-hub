-- Seed data for development

-- Insert sample class types
INSERT INTO class_types (name, description, duration, price, difficulty_level, image_url, instructor) VALUES
  ('Hatha Yoga', 'Traditional yoga practice focusing on physical postures and breathing techniques. Perfect for beginners and those seeking a gentle practice.', 60, 20.00, 'beginner', NULL, 'Siobhan Sears'),
  ('Vinyasa Flow', 'Dynamic flowing yoga sequences that sync breath with movement. Build strength and flexibility.', 75, 25.00, 'intermediate', NULL, 'Siobhan Sears'),
  ('Yin Yoga', 'Slow-paced practice with poses held for longer periods. Great for deep stretching and relaxation.', 60, 20.00, 'beginner', NULL, 'Siobhan Sears'),
  ('Power Yoga', 'Intense, fitness-based yoga that builds strength and endurance. Challenging flows for experienced students.', 60, 28.00, 'advanced', NULL, 'Siobhan Sears'),
  ('Kids Yoga', 'Fun, playful yoga designed for children. Build flexibility, focus, and confidence through movement and games.', 45, 18.00, 'beginner', NULL, 'Siobhan Sears'),
  ('Thai Massage Session', 'Therapeutic Thai massage combining assisted stretching and acupressure. Experience deep relaxation and tension relief.', 60, 75.00, 'beginner', NULL, 'Siobhan Sears');

-- Insert class packages
INSERT INTO packages (name, credits, price, description) VALUES
  ('5-Class Pack', 5, 90.00, 'Save $10 with our 5-class package. Perfect for trying out different classes.'),
  ('10-Class Pack', 10, 170.00, 'Save $30 with our most popular package. Great value for regular practice.'),
  ('20-Class Pack', 20, 320.00, 'Save $80 with our best value package. Ideal for dedicated practitioners.');

-- Create an admin user (you'll need to sign up with this email first)
-- Then run this to make them admin:
-- UPDATE profiles SET role = 'admin' WHERE email = 'admin@wellnesshub.com';
