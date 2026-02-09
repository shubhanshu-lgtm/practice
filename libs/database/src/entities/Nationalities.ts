import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("nationalities")
export class Nationalities {
  @PrimaryGeneratedColumn({ name: "num_code" })
  numCode: number;

  @Column("varchar", { name: "alpha_2_code", nullable: true, length: 2 })
  alpha_2Code: string | null;

  @Column("varchar", { name: "alpha_3_code", nullable: true, length: 3 })
  alpha_3Code: string | null;

  @Column("varchar", { name: "en_short_name", nullable: true, length: 52 })
  enShortName: string | null;

  @Column("varchar", { name: "nationality", nullable: true, length: 39 })
  nationality: string | null;
}
