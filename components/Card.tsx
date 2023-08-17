export default function Card() {
  return (
    <div className="flex-col space-y-rowGap group">
      <h2 className="font-bold text-h2 group-hover:text-primary">
        Target sales suffer after Pride month backlash
      </h2>
      <p className="text-caption">
        <span>10 hours ago</span>
        <span> &middot; </span>
        <span>3 mins read</span>
      </p>
      <p>
        US retail giant Target saw sales fall in-store and online for the first
        time in years after a backlash over its Pride Month offering. Sales
        dropped 5% in the April to June period compared with the same time last
        year - its first fall in six years.
      </p>
      <div className="text-xs text-textSecondary">
        <a>edit</a>
        <span> &middot; </span>
        <a>hide</a>
      </div>
    </div>
  );
}
