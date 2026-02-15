const logoNavbar = document.getElementById("logoNavbar")
const html_logoNavbar = `

        <!-- logo -->
        <div class = "logo-alsa-text">
            <a href="../../index.html">
                                                                    <!-- ganti path gambar logo disini -->
                                                                    <img src="../../asset/logo_alsalcunpad_primary_color.png" 
            alt="logo ALSA Local Chapter Unpad" 
            class="logo">


            </a>
            
            <div class="all-text">
                <a href="../../index.html" class="alsa-text">
                                                                    <!-- ganti tulisan di bawah ini -->
                                                                    ALSA Local Chapter 
                <br> 
                                                                    <!-- ganti tulisan di bawah ini -->
                                                                    Universitas Padjadjaran

                </a>
                <a href="../../index.html" class = "alsa-text-mini">

                                                                    <!-- ganti tulisan di bawah ini -->
                                                                    ALSA, Always be One!

                </a>
            </div>
        </div>
            


        <!-- navigation bar -->
        <nav class = "navigation-bar">
            
            <ul class="nav-links" id="navLinks">

                <a href="../board_page/board_page.html">

                                                                    <!-- ganti tulisan di bawah ini -->
                                                                    Board


                </a>

                <a href="../about_page/about_page.html">

                                                                    <!-- ganti tulisan di bawah ini -->
                                                                    About Us


                </a>

                <a href="../events_page/events_page.html">

                                                                    <!-- ganti tulisan di bawah ini -->
                                                                    Events

                </a>

                <a href="../publication_page/publication_page.html">

                                                                    <!-- ganti tulisan di bawah ini -->
                                                                    Publication

                </a>


                <!-- More  -->
                <div class="dropdown">
                    <button class="dropdown-btn"> 
                                                                    <!-- ganti tulisan di bawah ini -->
                                                                    More

                    </button>
    
                    <div class="dropdown-content">
                        <a href="../partnership_page/partnership_page.html"> 


                                                                    <!-- ganti tulisan di bawah ini -->
                                                                    Partnership


                        </a>
                        <a href="../merchandise_page/merchandise.html">

                                                                    <!-- ganti tulisan di bawah ini --> 
                                                                    Merchandise

                        </a>
                    </div>
                </div>
            </ul>

        </nav>`;

logoNavbar.innerHTML += html_logoNavbar 