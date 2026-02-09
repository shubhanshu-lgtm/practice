import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("countries")
export class Countries {
  @PrimaryGeneratedColumn({ name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("char", { name: "iso3", nullable: true, length: 3 })
  iso3: string | null;

  @Column("char", { name: "numeric_code", nullable: true, length: 3 })
  numericCode: string | null;

  @Column("char", { name: "iso2", nullable: true, length: 2 })
  iso2: string | null;

  @Column("varchar", { name: "phonecode", nullable: true, length: 255 })
  phonecode: string | null;

  @Column("varchar", { name: "capital", nullable: true, length: 255 })
  capital: string | null;

  @Column("varchar", { name: "currency", nullable: true, length: 255 })
  currency: string | null;

  @Column("varchar", { name: "currency_name", nullable: true, length: 255 })
  currencyName: string | null;

  @Column("varchar", { name: "currency_symbol", nullable: true, length: 255 })
  currencySymbol: string | null;

  @Column("varchar", { name: "tld", nullable: true, length: 255 })
  tld: string | null;

  @Column("varchar", { name: "native", nullable: true, length: 255 })
  native: string | null;

  @Column("varchar", { name: "region", nullable: true, length: 255 })
  region: string | null;

  @Column("varchar", { name: "subregion", nullable: true, length: 255 })
  subregion: string | null;

  @Column("text", { name: "timezones", nullable: true })
  timezones: string | null;

  @Column("text", { name: "translations", nullable: true })
  translations: string | null;

  @Column("decimal", {
    name: "latitude",
    nullable: true,
    precision: 10,
    scale: 8,
  })
  latitude: string | null;

  @Column("decimal", {
    name: "longitude",
    nullable: true,
    precision: 11,
    scale: 8,
  })
  longitude: string | null;

  @Column("varchar", { name: "emoji", nullable: true, length: 191 })
  emoji: string | null;

  @Column("varchar", { name: "emojiU", nullable: true, length: 191 })
  emojiU: string | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column("tinyint", { name: "flag", width: 1, default: () => "'1'" })
  flag: boolean;

  @Column("varchar", {
    name: "wikiDataId",
    nullable: true,
    comment: "Rapid API GeoDB Cities",
    length: 255,
  })
  wikiDataId: string | null;
}
