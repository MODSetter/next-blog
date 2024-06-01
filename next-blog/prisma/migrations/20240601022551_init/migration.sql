-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "maingrid" TEXT NOT NULL,
    "navbarlogo" TEXT NOT NULL,
    "navbar" TEXT NOT NULL,
    "footer" TEXT NOT NULL,
    "navbarlinks" TEXT NOT NULL,
    "footerlinks" TEXT NOT NULL,
    "defaultLight" TEXT NOT NULL,
    "defaultDark" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grid" (
    "id" TEXT NOT NULL,
    "comp_one" TEXT NOT NULL,
    "comp_two" TEXT NOT NULL,
    "comp_three" TEXT NOT NULL,
    "comp_four" TEXT NOT NULL,
    "comp_five" TEXT NOT NULL,

    CONSTRAINT "Grid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomComponent" (
    "id" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "tailwindcss" TEXT NOT NULL,

    CONSTRAINT "CustomComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GithubDiscussions" (
    "url" TEXT NOT NULL,
    "discussionId" INTEGER NOT NULL,

    CONSTRAINT "GithubDiscussions_pkey" PRIMARY KEY ("url")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "slug" TEXT NOT NULL,
    "opengraphimage" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metaDescription" TEXT,
    "metaKeywords" TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Tag" (
    "tagname" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagname")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_avatar_key" ON "User"("avatar");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "GithubDiscussions_url_key" ON "GithubDiscussions"("url");

-- CreateIndex
CREATE UNIQUE INDEX "GithubDiscussions_discussionId_key" ON "GithubDiscussions"("discussionId");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagname") ON DELETE CASCADE ON UPDATE CASCADE;
