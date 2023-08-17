export default function Footer() {
  return (
    <footer className="mt-sectionSpacing py-sectionSpacing">
      <div className="flex justify-center text-meta text-textSecondaryColor">
        &copy; Hypulse {new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  );
}
