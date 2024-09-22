<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique(); // Unique file identifier
            $table->string('file_name'); // Original file name
            $table->string('file_path'); // Path to stored file
            $table->string('mime_type'); // MIME type (e.g., image/jpeg, video/mp4)
            $table->string('file_type')->nullable(); // Type of file (image, video, etc.)
            $table->string('file_extension')->nullable(); // File extension (e.g., jpg, mp4)
            $table->integer('file_size'); // Size in bytes
            $table->string('disk')->default('public'); // Storage disk (public, s3, etc.)
            $table->string('collection_name')->nullable(); // Group files (e.g., avatar, documents)
            $table->string('file_url'); // Public URL for file
            $table->unsignedBigInteger('user_id')->nullable(); // File uploader (optional)
            $table->nullableMorphs('fileable'); // Polymorphic relationship (fileable_id, fileable_type)
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};