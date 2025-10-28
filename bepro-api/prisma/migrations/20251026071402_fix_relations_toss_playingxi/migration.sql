-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('SCHEDULED', 'TOSS', 'LINEUP_SET', 'LIVE', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "BallType" AS ENUM ('LEATHER', 'TENNIS');

-- CreateEnum
CREATE TYPE "TossDecision" AS ENUM ('BAT', 'BOWL');

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT,
    "teamAId" TEXT NOT NULL,
    "teamBId" TEXT NOT NULL,
    "ground" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "overs" INTEGER NOT NULL,
    "ballType" "BallType" NOT NULL DEFAULT 'LEATHER',
    "status" "MatchStatus" NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Toss" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "winnerTeamId" TEXT NOT NULL,
    "decision" "TossDecision" NOT NULL,

    CONSTRAINT "Toss_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayingXI" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isCaptain" BOOLEAN NOT NULL DEFAULT false,
    "isKeeper" BOOLEAN NOT NULL DEFAULT false,
    "battingOrder" INTEGER,

    CONSTRAINT "PlayingXI_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Match_teamAId_idx" ON "Match"("teamAId");

-- CreateIndex
CREATE INDEX "Match_teamBId_idx" ON "Match"("teamBId");

-- CreateIndex
CREATE INDEX "Match_startTime_idx" ON "Match"("startTime");

-- CreateIndex
CREATE INDEX "Match_status_idx" ON "Match"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Toss_matchId_key" ON "Toss"("matchId");

-- CreateIndex
CREATE INDEX "PlayingXI_matchId_teamId_idx" ON "PlayingXI"("matchId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayingXI_matchId_teamId_userId_key" ON "PlayingXI"("matchId", "teamId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayingXI_matchId_teamId_battingOrder_key" ON "PlayingXI"("matchId", "teamId", "battingOrder");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_teamAId_fkey" FOREIGN KEY ("teamAId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_teamBId_fkey" FOREIGN KEY ("teamBId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Toss" ADD CONSTRAINT "Toss_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Toss" ADD CONSTRAINT "Toss_winnerTeamId_fkey" FOREIGN KEY ("winnerTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayingXI" ADD CONSTRAINT "PlayingXI_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayingXI" ADD CONSTRAINT "PlayingXI_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayingXI" ADD CONSTRAINT "PlayingXI_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
