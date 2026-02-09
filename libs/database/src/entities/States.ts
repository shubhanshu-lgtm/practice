import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("states")
export class States {
  @PrimaryGeneratedColumn({ name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("mediumint", { name: "country_id", unsigned: true })
  countryId: number;

  @Column("char", { name: "country_code", length: 2 })
  countryCode: string;

  @Column("varchar", { name: "fips_code", nullable: true, length: 255 })
  fipsCode: string | null;

  @Column("varchar", { name: "iso2", nullable: true, length: 255 })
  iso2: string | null;

  @Column("varchar", { name: "type", nullable: true, length: 191 })
  type: string | null;

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
