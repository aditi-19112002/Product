import time
import sys


GREEN = "\033[92m"
CYAN = "\033[96m"
YELLOW = "\033[93m"
WHITE = "\033[97m"
RESET = "\033[0m"

print(f"\n{CYAN}  ⏳  Processing...{RESET}\n")

for i in range(101):
    filled = "█" * i
    empty = "░" * (100 - i)
    
    # Button style progress bar
    sys.stdout.write(f"\r  {WHITE}[{GREEN}{filled}{RESET}{empty}{WHITE}]{RESET}  {YELLOW}{i:3}%{RESET}")
    sys.stdout.flush()
    time.sleep(0.02)

print(f"\n\n  {GREEN}✅  Successfully Completed!{RESET}\n")