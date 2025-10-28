-- CreateEnum
CREATE TYPE "ExtraType" AS ENUM ('NONE', 'WIDE', 'NOBALL', 'BYE', 'LEGBYE');

-- CreateEnum
CREATE TYPE "WicketType" AS ENUM ('BOWLED', 'CAUGHT', 'LBW', 'RUN_OUT', 'STUMPED', 'HIT_WICKET', 'OBSTRUCTING', 'RETIRED', 'TIMED_OUT');

-- CreateTable
CREATE TABLE "Innings" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "battingTeamId" TEXT NOT NULL,
    "bowlingTeamId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "totalRuns" INTEGER NOT NULL DEFAULT 0,
    "wickets" INTEGER NOT NULL DEFAULT 0,
    "legalBalls" INTEGER NOT NULL DEFAULT 0,
    "wides" INTEGER NOT NULL DEFAULT 0,
    "noBalls" INTEGER NOT NULL DEFAULT 0,
    "byes" INTEGER NOT NULL DEFAULT 0,
    "legByes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Innings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Over" (
    "id" TEXT NOT NULL,
    "inningsId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "bowlerId" TEXT NOT NULL,
    "strikerId" TEXT NOT NULL,
    "nonStrikerId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "legalBalls" INTEGER NOT NULL DEFAULT 0,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Over_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ball" (
    "id" TEXT NOT NULL,
    "overId" TEXT NOT NULL,
    "seq" INTEGER NOT NULL,
    "batsmanId" TEXT NOT NULL,
    "nonStrikerId" TEXT NOT NULL,
    "bowlerId" TEXT NOT NULL,
    "runs" INTEGER NOT NULL DEFAULT 0,
    "extraType" "ExtraType" NOT NULL DEFAULT 'NONE',
    "extraRuns" INTEGER NOT NULL DEFAULT 0,
    "isLegal" BOOLEAN NOT NULL,
    "wicketType" "WicketType",
    "dismissalBatsmanId" TEXT,
    "fielderId" TEXT,
    "commentary" TEXT,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ball_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Innings_matchId_number_idx" ON "Innings"("matchId", "number");

-- CreateIndex
CREATE INDEX "Over_inningsId_number_idx" ON "Over"("inningsId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Over_inningsId_number_key" ON "Over"("inningsId", "number");

-- CreateIndex
CREATE INDEX "Ball_overId_seq_idx" ON "Ball"("overId", "seq");

-- AddForeignKey
ALTER TABLE "Innings" ADD CONSTRAINT "Innings_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Innings" ADD CONSTRAINT "Innings_battingTeamId_fkey" FOREIGN KEY ("battingTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Innings" ADD CONSTRAINT "Innings_bowlingTeamId_fkey" FOREIGN KEY ("bowlingTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Over" ADD CONSTRAINT "Over_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "Innings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ball" ADD CONSTRAINT "Ball_overId_fkey" FOREIGN KEY ("overId") REFERENCES "Over"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
