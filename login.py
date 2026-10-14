import tkinter as tk
from tkinter import messagebox

# Window setup
root = tk.Tk()
root.title("Login Form")
root.geometry("400x500")
root.configure(bg="#0f172a")
root.resizable(False, False)

# Center the window
root.update_idletasks()
x = (root.winfo_screenwidth() // 2) - (400 // 2)
y = (root.winfo_screenheight() // 2) - (500 // 2)
root.geometry(f"400x500+{x}+{y}")

# Main Frame
main_frame = tk.Frame(root, bg="#0f172a")
main_frame.pack(expand=True, fill="both", padx=30, pady=30)

# Logo / Title
title = tk.Label(
    main_frame, 
    text="🔐", 
    font=("Segoe UI", 40),
    bg="#0f172a",
    fg="white"
)
title.pack(pady=(10, 5))

heading = tk.Label(
    main_frame,
    text="Welcome Back",
    font=("Segoe UI", 24, "bold"),
    bg="#0f172a",
    fg="white"
)
heading.pack(pady=(0, 5))

subtitle = tk.Label(
    main_frame,
    text="Login to your account",
    font=("Segoe UI", 11),
    bg="#0f172a",
    fg="#94a3b8"
)
subtitle.pack(pady=(0, 30))

# Email
email_label = tk.Label(
    main_frame,
    text="Email Address",
    font=("Segoe UI", 10, "bold"),
    bg="#0f172a",
    fg="#c4b5fd",
    anchor="w"
)
email_label.pack(fill="x", pady=(0, 6))

email_entry = tk.Entry(
    main_frame,
    font=("Segoe UI", 12),
    bg="#1e293b",
    fg="white",
    insertbackground="white",
    relief="flat",
    highlightthickness=1,
    highlightbackground="#334155",
    highlightcolor="#a855f7"
)
email_entry.pack(fill="x", ipady=10, pady=(0, 18))

# Password
pass_label = tk.Label(
    main_frame,
    text="Password",
    font=("Segoe UI", 10, "bold"),
    bg="#0f172a",
    fg="#c4b5fd",
    anchor="w"
)
pass_label.pack(fill="x", pady=(0, 6))

pass_entry = tk.Entry(
    main_frame,
    font=("Segoe UI", 12),
    bg="#1e293b",
    fg="white",
    insertbackground="white",
    relief="flat",
    show="•",
    highlightthickness=1,
    highlightbackground="#334155",
    highlightcolor="#a855f7"
)
pass_entry.pack(fill="x", ipady=10, pady=(0, 25))

# Login Function
def login():
    email = email_entry.get().strip()
    password = pass_entry.get().strip()

    if not email or not password:
        messagebox.showwarning("Error", "Please fill all fields!")
        return

    # Simple demo check (aap yahan real logic laga sakte ho)
    if len(password) < 4:
        messagebox.showerror("Error", "Password must be at least 4 characters!")
        return

    name = email.split("@")[0] if "@" in email else email
    messagebox.showinfo("Success", f"🎉 Welcome back, {name}!")

# Login Button
login_btn = tk.Button(
    main_frame,
    text="Login →",
    font=("Segoe UI", 13, "bold"),
    bg="#a855f7",
    fg="white",
    activebackground="#9333ea",
    activeforeground="white",
    relief="flat",
    cursor="hand2",
    command=login
)
login_btn.pack(fill="x", ipady=12)


footer = tk.Label(
    main_frame,
    text="Don't have an account? Sign Up",
    font=("Segoe UI", 10),
    bg="#0f172a",
    fg="#64748b"
)
footer.pack(pady=(25, 0))


root.mainloop()