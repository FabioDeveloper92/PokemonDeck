export class PokemonDetail {
    id: number
    name: string
    base_experience: number
    height: number
    is_default: boolean
    order: number
    weight: number
    abilities: Ability[]
    forms: Form[]
    game_indices: GameIndex[]
    held_items: HeldItem[]
    location_area_encounters: string
    moves: Move[]
    species: Species
    sprites: Sprites
    cries: Cries
    stats: Stat[]
    types: Type[]
    past_types: PastType[]
  }
  
  export class Ability {
    is_hidden: boolean
    slot: number
    ability: AbilityDetail
  }
  
  export class AbilityDetail {
    name: string
    url: string
  }
  
  export class Form {
    name: string
    url: string
  }
  
  export class GameIndex {
    game_index: number
    version: Version
  }
  
  export class Version {
    name: string
    url: string
  }
  
  export class HeldItem {
    item: ItemInfo
    version_details: VersionDetail[]
  }
  
  export class ItemInfo {
    name: string
    url: string
  }
  
  export class VersionDetail {
    rarity: number
    version: VersionInfo
  }
  
  export class VersionInfo {
    name: string
    url: string
  }
  
  export class Move {
    move: MoveInfo
    version_group_details: VersionGroupDetail[]
  }
  
  export class MoveInfo {
    name: string
    url: string
  }
  
  export class VersionGroupDetail {
    level_learned_at: number
    version_group: VersionGroup
    move_learn_method: MoveLearnMethod
  }
  
  export class VersionGroup {
    name: string
    url: string
  }
  
  export class MoveLearnMethod {
    name: string
    url: string
  }
  
  export class Species {
    name: string
    url: string
  }
  
  export class Sprites {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
    other: Other
    versions: Versions
  }
  
  export class Other {
    dream_world: DreamWorld
    home: Home
    "official-artwork": OfficialArtwork
    showdown: Showdown
  }
  
  export class DreamWorld {
    front_default: string
    front_female: any
  }
  
  export class Home {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
  }
  
  export class OfficialArtwork {
    front_default: string
    front_shiny: string
  }
  
  export class Showdown {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
  }
  
  export class Versions {
    "generation-i": GenerationI
    "generation-ii": GenerationIi
    "generation-iii": GenerationIii
    "generation-iv": GenerationIv
    "generation-v": GenerationV
    "generation-vi": GenerationVi
    "generation-vii": GenerationVii
    "generation-viii": GenerationViii
  }
  
  export class GenerationI {
    "red-blue": RedBlue
    yellow: Yellow
  }
  
  export class RedBlue {
    back_default: string
    back_gray: string
    front_default: string
    front_gray: string
  }
  
  export class Yellow {
    back_default: string
    back_gray: string
    front_default: string
    front_gray: string
  }
  
  export class GenerationIi {
    crystal: Crystal
    gold: Gold
    silver: Silver
  }
  
  export class Crystal {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
  }
  
  export class Gold {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
  }
  
  export class Silver {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
  }
  
  export class GenerationIii {
    emerald: Emerald
    "firered-leafgreen": FireredLeafgreen
    "ruby-sapphire": RubySapphire
  }
  
  export class Emerald {
    front_default: string
    front_shiny: string
  }
  
  export class FireredLeafgreen {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
  }
  
  export class RubySapphire {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
  }
  
  export class GenerationIv {
    "diamond-pearl": DiamondPearl
    "heartgold-soulsilver": HeartgoldSoulsilver
    platinum: Platinum
  }
  
  export class DiamondPearl {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
  }
  
  export class HeartgoldSoulsilver {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
  }
  
  export class Platinum {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
  }
  
  export class GenerationV {
    "black-white": BlackWhite
  }
  
  export class BlackWhite {
    animated: Animated
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
  }
  
  export class Animated {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
  }
  
  export class GenerationVi {
    "omegaruby-alphasapphire": OmegarubyAlphasapphire
    "x-y": XY
  }
  
  export class OmegarubyAlphasapphire {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
  }
  
  export class XY {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
  }
  
  export class GenerationVii {
    icons: Icons
    "ultra-sun-ultra-moon": UltraSunUltraMoon
  }
  
  export class Icons {
    front_default: string
    front_female: any
  }
  
  export class UltraSunUltraMoon {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
  }
  
  export class GenerationViii {
    icons: Icons2
  }
  
  export class Icons2 {
    front_default: string
    front_female: any
  }
  
  export class Cries {
    latest: string
    legacy: string
  }
  
  export class Stat {
    base_stat: number
    effort: number
    stat: Stat2
  }
  
  export class Stat2 {
    name: string
    url: string
  }
  
  export class Type {
    slot: number
    type: TypeInfo
  }
  
  export class TypeInfo {
    name: string
    url: string
  }
  
  export class PastType {
    generation: Generation
    types: PastTypeInfo[]
  }
  
  export class Generation {
    name: string
    url: string
  }
  
  export class PastTypeInfo {
    slot: number
    type: PastTypeInfoUrl
  }
  
  export class PastTypeInfoUrl {
    name: string
    url: string
  }
  