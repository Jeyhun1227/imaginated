-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "verified" BOOLEAN,
    "individual" INTEGER,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "all_reviews" (
    "id" SERIAL NOT NULL,
    "individual" INTEGER,
    "user" INTEGER,
    "premium_offer" INTEGER,
    "description" TEXT,
    "like" TEXT,
    "dislike" TEXT,
    "benefit" TEXT,
    "type" VARCHAR(100),
    "review" INTEGER,
    "title" VARCHAR(400),
    "validation" VARCHAR(400),
    "createdate" TIMESTAMP(6)
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(200),
    "parent" VARCHAR(200),
    "ranking" INTEGER,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "individual" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(200),
    "last_name" VARCHAR(200),
    "aka" VARCHAR(200),
    "description" TEXT,
    "feature" VARCHAR(500),
    "company" VARCHAR(200),
    "location" VARCHAR(200),
    "founder" VARCHAR(200),
    "link" VARCHAR(200),
    "category" VARCHAR(200),
    "subcategory" TEXT[],
    "verified" BOOLEAN,
    "imagelink" VARCHAR(500),
    "linkname" VARCHAR(450)
);

-- CreateTable
CREATE TABLE "individual_favorites" (
    "id" SERIAL NOT NULL,
    "individual" INTEGER,
    "category" VARCHAR(200),
    "subcategory" VARCHAR(200),
    "name" VARCHAR(200),
    "description" TEXT,
    "imagelink" VARCHAR(200),
    "link" VARCHAR(200),
    "validation" VARCHAR(50)
);

-- CreateTable
CREATE TABLE "individual_free_offerings" (
    "id" SERIAL NOT NULL,
    "individual" INTEGER,
    "youtube" VARCHAR(200),
    "facebook" VARCHAR(200),
    "twitter" VARCHAR(200),
    "tiktok" VARCHAR(200),
    "instagram" VARCHAR(200),
    "linkedin" VARCHAR(200),
    "slack" VARCHAR(200),
    "discord" VARCHAR(200)
);

-- CreateTable
CREATE TABLE "individual_premium_offerings" (
    "id" SERIAL NOT NULL,
    "individual" INTEGER,
    "name" VARCHAR(200),
    "description" TEXT,
    "subheader" VARCHAR(200),
    "subcategory" TEXT[],
    "imagelink" VARCHAR(200),
    "link" VARCHAR(200),
    "type" VARCHAR(250),
    "rank" INTEGER
);

-- CreateTable
CREATE TABLE "subcategory" (
    "id" SERIAL NOT NULL,
    "subcategory" VARCHAR(200),
    "categoryname" VARCHAR(200)
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
