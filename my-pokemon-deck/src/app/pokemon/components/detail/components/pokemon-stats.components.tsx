import { ProgressBar } from "react-bootstrap";
import { Stat } from "../../../model/api/pokemon-detail.model";
class PokemonStatsComponentProps {
  title: string;
  customTitleClass?: string;

  stats: Stat[];
  maxStats: number;
}

export function PokemonStatsComponent({
  title,
  customTitleClass,

  stats,
  maxStats,
}: PokemonStatsComponentProps) {
  const getVariant = (name: string) => {
    if (name.includes("special")) return "secondary";
    if (name.includes("hp")) return "warning";
    if (name.includes("speed")) return "info";

    return null;
  };

  return (
    <>
      {stats && (
        <>
          <div className={`mb-2 ${customTitleClass ?? "h4 text-start"}`}>{title}</div>
          {stats.map((stat: Stat, index: number) => (
            <div key={index} className="mb-3">
              <ProgressBar
                title={stat.stat.name}
                className="progressbar-label-start border"
                variant={getVariant(stat.stat.name)}
                now={stat.base_stat}
                label={`${stat.stat.name}: ${stat.base_stat}`}
                max={maxStats}
              ></ProgressBar>
            </div>
          ))}
        </>
      )}
    </>
  );
}
