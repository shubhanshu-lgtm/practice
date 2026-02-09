import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cities")
export class Cities {
  @PrimaryGeneratedColumn( { name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("mediumint", { name: "state_id", unsigned: true })
  stateId: number;

  @Column("varchar", { name: "state_code", length: 255 })
  stateCode: string;

  @Column("mediumint", { name: "country_id", unsigned: true })
  countryId: number;

  @Column("char", { name: "country_code", length: 2 })
  countryCode: string;

  @Column("decimal", { name: "latitude", precision: 10, scale: 8 })
  latitude: string;

  @Column("decimal", { name: "longitude", precision: 11, scale: 8 })
  longitude: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "'2014-01-01 01:01:01'",
  })
  createdAt: Date;

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
